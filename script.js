function showSection(sectionId){
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
}

function calculateDosha(){
  const q1 = document.getElementById('q1').value;
  const q2 = document.getElementById('q2').value;
  const doshaCount = {Vata:0, Pitta:0, Kapha:0};
  doshaCount[q1]++; doshaCount[q2]++;
  let result = Object.keys(doshaCount).reduce((a,b)=> doshaCount[a]>=doshaCount[b]?a:b);
  document.getElementById('doshaResult').innerText = `Your predominant dosha is: ${result}`;
}

function submitAppointment(){
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const date = document.getElementById('date').value;
  if(name && phone && date){
    const urlParams = new URLSearchParams(window.location.search);
    const patientID = urlParams.get('patient') || '';
    let message = `New BNYS4U Appointment:\nName: ${name}\nPhone: ${phone}\nPreferred Date: ${date}`;
    if(patientID) message += `\nPatient ID: ${patientID}`;
    window.open(`https://wa.me/918858102095?text=${encodeURIComponent(message)}`, '_blank');
    document.getElementById('appointmentForm').reset();
    document.getElementById('appointmentResult').innerText = `Thank you ${name}! Appointment sent to WhatsApp.`;
  } else {
    document.getElementById('appointmentResult').innerText = `Please fill all fields.`;
  }
}

// QR code functions
function generateQRCode(){ generateQRWithPatient(''); }
function generateAutoQR(){
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random()*9000)+1000;
  generateQRWithPatient(`BNYS4U-${timestamp}-${randomNum}`);
}
function generateQRWithPatient(patientID){
  const url = patientID ? `index.html?patient=${encodeURIComponent(patientID)}` : 'index.html';
  const qrDiv = document.getElementById('qrcode'); qrDiv.innerHTML='';
  new QRCode(qrDiv, { text: url, width: 180, height: 180 });
  alert("Your QR code is ready!");
}

// Personalized greeting
window.addEventListener('load', ()=>{
  const patient = new URLSearchParams(window.location.search).get('patient');
  if(patient){
    const greeting = document.createElement('p');
    greeting.innerText = `Welcome, ${patient}! Tap below to explore your personalized BNYS4U card.`;
    greeting.style.fontWeight = "bold";
    document.getElementById('home').prepend(greeting);
  }
  showSection('home');
});

// Service Worker
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{ navigator.serviceWorker.register('sw.js'); });
}


