import Gio from "gi://Gio";

class OutputWriter {
  outputStream: Gio.DataOutputStream;
  constructor() {
    this.outputStream = new Gio.DataOutputStream({
      baseStream: new Gio.UnixOutputStream({ fd: 1, closeFd: true }),
      closeBaseStream: true,
    });
  }

  write(content: string) {
    this.outputStream.write(content, null);
    this.outputStream.close(null);
  }
}

export default OutputWriter;
