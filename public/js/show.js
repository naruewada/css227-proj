document.getElementById('conment-show').addEventListener('click',hidden);
document.getElementById('booking').addEventListener('click', show);


function hidden(){
      document.getElementById('booking-tap').classList.add('hidden');
      document.getElementById('comment-button').classList.remove('hidden');
      
       
}

function show(){
    document.getElementById('booking-tap').classList.remove('hidden');
    document.getElementById('booking-tap').classList.remove('hidden');
    document.getElementById('comment-button').classList.add('hidden');
    
}

