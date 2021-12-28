<template>
  <nav>
    <div class="nav-header">
      <div class="container">
        <div class="order-online">order online or call us 0248477398</div>
        <div class="advanced-buttons">
          <ul class="nav-icons">
            <li class="search">search</li>
            <li class="wishlist">wishlist</li>
            <li class="currency">USD</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="navbar">
      <div class="container">
        <div class="logo">materialmax.com</div>
        <div class="menu-items">
          <ul>
            <li><a class="nav-link" href="">home</a></li>
            <li><a class="nav-link" href="">catalog</a></li>
            <li><a class="nav-link" href="">megamenu</a></li>
            <li><a class="nav-link" href="">sale</a></li>
            <li><a class="nav-link" href="">blog</a></li>
            <li><a class="nav-link" href="">contact</a></li>
          </ul>
        </div>
        <!-- <div class="cart"><span> my cart:</span> 0 item(s)</div> -->
        <NuxtLink class="nav-link" to="/Account">Login/Signup</NuxtLink>
      </div>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
</style>