class PhoneHandler {
  public Handler(data: { main: HTMLElement; description: HTMLElement; stats: HTMLElement }) {
    data.main.style.flexDirection = "column";
    data.main.style.alignItems = "center";

    data.description.style.height = "70%";
    data.stats.style.display = "none";
  }
}

export default PhoneHandler;
