import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "default-layout",
  templateUrl: "./default.html",
  imports: [RouterOutlet]
})
export class DefaultLayout {
  protected readonly currentYear = new Date().getFullYear();
}
