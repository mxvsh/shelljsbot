import child_process from "child_process";

const exec = child_process.exec;

const Execute = async function(command: string) {
  return new Promise((resolve: any) => {
    exec(command, (error, stdout, stderr) => {
      if (error !== null) {
        resolve(error);
      } else {
        resolve(stdout);
      }
    });
  });
};

export { Execute };
