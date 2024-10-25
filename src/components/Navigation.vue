<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <img src="@/assets/logo.svg" alt="Logo" />
    <RouterLink to="/projects">Projects</RouterLink>
    <RouterLink to="/contact">Contact</RouterLink>
  </nav>
</template>

<style>
  nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;
  }

  nav img {
    height: 70px;
  }

  nav a {
    color: white;
    text-decoration: none;
  }

  nav a:hover {
    text-decoration: underline;
  }
</style>
