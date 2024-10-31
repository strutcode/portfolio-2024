<template>
  <div class="container">
    <div class="left">
      <img src="../assets/me.jpg" alt="Profile photograph of me" class="heroimage" />
    </div>
    <div class="right">
      <h1>About Me</h1>

      <nav>
        <RouterLink to="/">Summary</RouterLink>
        <RouterLink to="/">Confidences</RouterLink>
      </nav>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .left,
  .right {
    width: 40%;
    display: inline-block;
  }

  .heroimage {
    width: 100%;
    border-radius: 10px;
  }

  a {
    font-size: 1.5em;
    color: #ccc;
    text-decoration: none;
  }
</style>
