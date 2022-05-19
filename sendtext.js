var btns;
var textbox;
var warningbox;

const onTransmitFinish = (btn) => {
  btn.disabled = false;
  var originalText = btn.innerText;
  btn.innerText = btn.getAttribute("data-quiet-sending-text");
  btn.setAttribute("data-quiet-sending-text", originalText);
};

const onClick = (e, transmit) => {
  e.target.disabled = true;
  var originalText = e.target.innerText;
  e.target.innerText = e.target.getAttribute("data-quiet-sending-text");
  e.target.setAttribute("data-quiet-sending-text", originalText);
  var payload = textbox.value;
  if (payload === "") {
    onFinish();
    return;
  }
  transmit.transmit(Quiet.str2ab(payload));
};

const setupButton = (btn) => {
  var profilename = btn.getAttribute("data-quiet-profile-name");
  const onFinish = () => onTransmitFinish(btn);

  var transmit = Quiet.transmitter({
    profile: profilename,
    onFinish: onFinish,
    clampFrame: false,
  });

  btn.addEventListener("click", (e) => onClick(e, transmit), false);
};

function onQuietReady() {
  for (var i = 0; i < btns.length; i++) {
    setupButton(btns[i]);
  }
}

const onQuietFail = (reason) => {
  console.log("quiet failed to initialize: " + reason);
  warningbox.textContent = `Sorry, it looks like there was a problem with this example (${reason})`;
};

window.onload = () => {
  btns = document.querySelectorAll("[data-quiet-send-text-button]");
  textbox = document.querySelector("[data-quiet-text-input]");
  warningbox = document.querySelector("[data-quiet-send-text-warning]");
  Quiet.addReadyCallback(onQuietReady, onQuietFail);
};
