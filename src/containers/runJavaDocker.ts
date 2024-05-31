// import Docker from "dockerode";

// import { TestCases } from "../types/testCases";
import { JAVA_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";

async function runJava(code: string, test: string) {
  const rawLogBuffer: Buffer[] = [];
  console.log("initialising a new java docker container");
  const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${test.replace(/'/g, `'\\"`)}' | java Main`;
  console.log(runCommand);
  const javaDockerContainer = await createContainer(JAVA_IMAGE, [
    "/bin/sh",
    "-c",
    runCommand
  ]);

  // starting the corresponding docker container
  await javaDockerContainer.start();
  console.log("Started the docker container");

  const loggerStream = await javaDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true // whether the logs are streamed or returned as a string
  });

  // Attach events on the streams objects to start and stop reading
  loggerStream.on("data", chunk => {
    rawLogBuffer.push(chunk);
  });

  const response = await new Promise(res => {
    loggerStream.on("end", () => {
      const completeBuffer = Buffer.concat(rawLogBuffer);
      const decodedStream = decodeDockerStream(completeBuffer);
      console.log(decodedStream);
      console.log(decodedStream.stdout);
      res(decodedStream);
    });
  });

  await javaDockerContainer.remove();
  return response;
}

export default runJava;
