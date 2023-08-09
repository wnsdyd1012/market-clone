const form = document.querySelector("#signup-form");

const checkPassword = () => {
  const formData = new FormData(form);
  const pass1 = formData.get("password");
  const pass2 = formData.get("password2");

  if (pass1 === pass2) {
    return true;
  } else return false;
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);
  console.log(formData.get("password"));

  const div = document.querySelector("#info");

  if (checkPassword()) {
    const res = await fetch("/signup", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data === "200") {
      //   div.innerText = "회원가입에 성공했습니다!";
      //   div.style.color = "blue";
      alert("회원 가입에 성공했습니다.");
      window.location.pathname = "/login.html";
    }
  } else {
    div.innerText = "비밀번호가 일치하지 않습니다.";
    div.style.color = "red";
  }
};

form.addEventListener("submit", handleSubmit);
