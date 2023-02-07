import React from 'react'
import ContentLoader from 'react-content-loader'

const PizzaBlockSkeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 280 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="125" r="125" />
    <rect x="0" y="280" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="325" rx="10" ry="10" width="280" height="85" />
    <rect x="0" y="435" rx="10" ry="10" width="95" height="30" />
    <rect x="125" y="427" rx="24" ry="24" width="153" height="45" />
  </ContentLoader>
)

export default PizzaBlockSkeleton
