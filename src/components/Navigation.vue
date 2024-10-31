<template>
  <nav class="header">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <img src="@/assets/logo.svg" alt="Logo" />
    <RouterLink to="/projects">Projects</RouterLink>
    <RouterLink to="/contact">Contact</RouterLink>
  </nav>
</template>

<style scoped>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1.5rem 0;
    z-index: +10;

    img {
      height: 70px;
    }
  }

  :deep(a) {
    font-size: 2.1em;
    color: #ccc;
    text-decoration: none;
  }

  :deep(a:hover) {
    text-decoration: underline;
  }
</style>
