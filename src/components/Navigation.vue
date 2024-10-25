<template>
  <nav>
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
    padding: 1rem;

    img {
      height: 70px;
    }

    ::v-deep a {
      color: white;
      text-decoration: none;
    }

    ::v-deep a:hover {
      text-decoration: underline;
    }
  }
</style>
