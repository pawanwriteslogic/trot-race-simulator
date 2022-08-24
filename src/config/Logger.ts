class Logger {
  public log = async (message: string, status?: number) => {
    if (status === undefined) {
      await console.log(message)
    } else {
      await console.log(status + ' : ', message)
    }
  }
}

export default new Logger()
