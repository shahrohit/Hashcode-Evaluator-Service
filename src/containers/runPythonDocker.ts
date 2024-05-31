// import Docker from "dockerode";

// import { TestCases } from "../types/testCases";
import { PYTHON_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";

async function runPython(code: string, test: string) {
  const rawLogBuffer: Buffer[] = [];
  console.log("initialising a new python docker container");
  const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${test.replace(/'/g, `'\\"`)}' | python3 test.py`;
  console.log(runCommand);
  const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    "/bin/sh",
    "-c",
    runCommand
  ]);

  // starting the corresponding docker container
  await pythonDockerContainer.start();
  console.log("Started the docker container");

  const loggerStream = await pythonDockerContainer.logs({
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

  await pythonDockerContainer.remove();
  return response;
}

export default runPython;
