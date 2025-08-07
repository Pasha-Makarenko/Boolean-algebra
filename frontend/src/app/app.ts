import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"

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
    fetch("http://localhost:8000/api/test", { method: "GET" })
      .then(console.log)
      .catch(console.error)
  }
}
