const elementBtnRadio2D = document.querySelector("#btnradio2D");
const elementBtnRadio3D = document.querySelector("#btnradio3D");

elementBtnRadio2D.addEventListener("click", () => {
  onClickCheckedAdd(elementBtnRadio2D);
  onClickCheckedRemove(elementBtnRadio3D);
  localStorage.setItem("imageType", "2d");
  initialApp();
});

elementBtnRadio3D.addEventListener("click", () => {
  console.log("radio2");
  onClickCheckedAdd(elementBtnRadio3D);
  onClickCheckedRemove(elementBtnRadio2D);
  localStorage.setItem("imageType", "3d");
  initialApp();
});

const onClickCheckedAdd = (elementBtnRadio) =>
  elementBtnRadio.setAttribute("checked", true);

const onClickCheckedRemove = (elementBtnRadio) =>
  elementBtnRadio.removeAttribute("checked");
