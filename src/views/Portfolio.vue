<template>
  <div>
    <nav>
      <RouterLink to="/">Past Work</RouterLink>
      <RouterLink to="/">Side Projects</RouterLink>
    </nav>

    <div class="carousel">
      <div class="slide">
        <h2>Project 1</h2>
        <img src="../assets/placeholder.jpg" alt="Project 1" />
      </div>
      <div class="slide">
        <h2>Project 2</h2>
        <img src="../assets/placeholder.jpg" alt="Project 2" />
      </div>
      <div class="slide">
        <h2>Project 3</h2>
        <img src="../assets/placeholder.jpg" alt="Project 3" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    border: thin solid rgba(87, 203, 215, 0.25);
    border-width: 4px 0;
    padding: 2rem 0;
  }

  .slide {
    flex: 0 0 220px;
    height: 300px;
    scroll-snap-align: start;
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    margin: 0 1rem;
  }

  img {
    width: 100%;
    border-radius: 10px;
  }

  nav {
    display: flex;
    justify-content: space-around;
    padding: 1rem 0;
  }

  a {
    font-size: 1.5em;
    color: #ccc;
    text-decoration: none;
  }
</style>
