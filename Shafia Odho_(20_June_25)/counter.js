  let count = 0;

    function updateCounter() {
      document.getElementById("counter").innerHTML = count;
    }

    function increment() {
      count++;
      updateCounter();
    }

    function decrement() {
      count--;
      updateCounter();
    }

    function toggleDarkMode() {
      document.body.classList.toggle("dark-mode");
    }