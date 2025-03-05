class Service {
  public Show(show: boolean = true) {
    const modal = document.getElementById("all_modals") as HTMLElement;

    if (show) modal.style.display = "block";
    else
      setTimeout(() => {
        modal.style.display = "none";
      }, 1000);
  }
}

export default Service;
