import app from "./app";

app.listen(app.get("port"), () => {
  console.log("SERVER ON PORT", app.get("port"));
});
