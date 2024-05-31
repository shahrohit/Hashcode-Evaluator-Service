import Docker from "dockerode";

async function createContainer(imageName: string, cmdExectable: string[]) {
  const docker = new Docker();

  const container = await docker.createContainer({
    Image: imageName,
    Cmd: cmdExectable,
    AttachStdin: true, // to enable input streams
    AttachStdout: true, // to enable output streams
    AttachStderr: true, // to enable error streams
    Tty: false,
    OpenStdin: true // keep the input stream open even no interaction is there
  });
  return container;
}

export default createContainer;
