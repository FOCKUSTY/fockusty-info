import Service from "./modals.service";

class Handler {
    public ShowModal(id: string) {
        new Service().Show();
        
        const modal = document.getElementById(id + "_bg") as HTMLElement;

        modal.style.display = "block";
        setTimeout(() => { modal.style.opacity = "1" }, 300);
    }
}

export default Handler;