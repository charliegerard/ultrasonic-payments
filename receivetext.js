var receiver;

const onReceive = (recvPayload, recvObj) => {
  recvObj.content = Quiet.mergeab(recvObj.content, recvPayload);

  const link = Quiet.ab2str(recvObj.content);
  const linkURL = new URL(link);

  if (linkURL.host === "buy.stripe.com") {
    window.location.href = linkURL;
  }

  recvObj.successes++;
  var total = recvObj.failures + recvObj.successes;
  var ratio = (recvObj.failures / total) * 100;
  recvObj.warningbox.textContent = `You may need to move the transmitter closer to the receiver and set the volume to 50%. Packet Loss: ${recvObj.failures
    } / ${total} (${ratio.toFixed(0)}%)`;
};

function onReceiverCreateFail(reason, recvObj) {
  console.log("failed to create quiet receiver: " + reason);
  recvObj.warningbox.textContent =
    "Sorry, it looks like this example is not supported by your browser. Please give permission to use the microphone or try again in Google Chrome or Microsoft Edge.";
}

const onReceiveFail = (num_fails, recvObj) => {
  recvObj.failures = num_fails;
  var total = recvObj.failures + recvObj.successes;
  var ratio = (recvObj.failures / total) * 100;
  recvObj.warningbox.textContent = `You may need to move the transmitter closer to the receiver and set the volume to 50%. Packet Loss: ${recvObj.failures
    } / ${total} (${ratio.toFixed(0)}%)`;
};

const onClick = (e, recvObj) => {
  e.target.disabled = true;
  var originalText = e.target.innerText;
  e.target.innerText = e.target.getAttribute("data-quiet-receiving-text");
  e.target.setAttribute("data-quiet-receiving-text", originalText);

  const receiverOnReceive = (payload) => onReceive(payload, recvObj);

  const receiverOnReceiverCreateFail = (reason) =>
    onReceiverCreateFail(reason, recvObj);

  const receiverOnReceiveFail = (num_fails) =>
    onReceiveFail(num_fails, recvObj);

  Quiet.receiver({
    profile: recvObj.profilename,
    onReceive: receiverOnReceive,
    onCreateFail: receiverOnReceiverCreateFail,
    onReceiveFail: receiverOnReceiveFail,
  });

  recvObj.target.classList.remove("hidden");
};

const setupReceiver = (receiver) => {
  var recvObj = {
    profilename: receiver.getAttribute("data-quiet-profile-name"),
    btn: receiver.querySelector("[data-quiet-receive-text-button]"),
    warningbox: receiver.querySelector("[data-quiet-receive-text-warning]"),
    successes: 0,
    failures: 0,
    content: new ArrayBuffer(0),
  };
  recvObj.btn.addEventListener("click", (e) => onClick(e, recvObj), false);
};

const onQuietReady = () => setupReceiver(receiver);

const onQuietFail = (reason) => {
  console.log("quiet failed to initialize: " + reason);
  var warningbox = document.querySelector("[data-quiet-receive-text-warning]");
  warningbox.textContent = `Sorry, it looks like there was a problem with this example (${reason})`;
};

window.onload = () => {
  receiver = document.querySelector("[data-quiet-receive-text]");
  Quiet.addReadyCallback(onQuietReady, onQuietFail);
};
