import Gio from "gi://Gio";
import GioUnix from "@girs/giounix-2.0";

class OutputWriter {
  outputStream: Gio.DataOutputStream;
  constructor() {
    this.outputStream = new Gio.DataOutputStream({
      baseStream: new GioUnix.OutputStream({ fd: 1, closeFd: true }),
      closeBaseStream: true,
    });
  }

  write(content: string) {
    this.outputStream.write(content, null);
    this.outputStream.close(null);
  }
}

export default OutputWriter;
