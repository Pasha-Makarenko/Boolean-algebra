import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { environment } from "../environments/environment"

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.html",
  styleUrl: "./app.scss"
})
export class App {
  protected title = "Boolean Calculator"

  constructor() {
    console.log(1)
    fetch(`${environment.apiUrl}/test`, { method: "GET" })
      .then(res => res.json())
      .then(console.log)
      .catch(console.error)
  }
}
