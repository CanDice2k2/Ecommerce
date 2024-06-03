export const navigation = {
  categories: [{
          id: 'women',
          name: 'Nữ',
          featured: [{
                  name: 'Sản phẩm mới',
                  href: '/',
                  imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                  imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
              },
              {
                  name: 'Basic Tees',
                  href: '/',
                  imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                  imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
              },
          ],
          sections: [{
                  id: 'clothing',
                  name: 'Quần áo',
                  items: [
                      { name: 'Áo thun', id: "aothun", href: `{women/clothing/women_aothun}` },
                      { name: 'Áo sơ mi', id: "aosomi", href: `{women/clothing/women_aosomi}` },
                      { name: 'Áo Polo', id: 'aopolo', href: `{women/clothing/lengha_aopolo}` },
                      { name: 'Quần Jeans', id: 'quanjeans', href: `{women/clothing/women_quanjeans}` },
                      { name: 'Quần Kaki', id: 'quankaki', href: `{women/clothing/women_quankaki}` },
                      { name: 'Quần Short', id: 'quanshort', href: `{women/clothing/women_quanshort}` }
                  ],
              },
              {
                  id: 'accessories',
                  name: 'Phụ kiện',
                  items: [
                      { name: 'Đồng hồ', id: 'dongho', href: `{women/accessories/women_dongho}` },
                      { name: 'Ví/Túi xách', id: 'vi_tuixach', href: `{women/accessories/women_vituixach}` },
                      { name: 'Mũ', id: 'mu', href: `{women/accessories/women_mu}` },
                      { name: 'Kính râm', id: 'kinhram', href: `{women/accessories/women_kinhram}` },
                      { name: 'Thắt lưng', id: 'thatlung', href: `{women/accessories/women_thatlung}` },

                  ],
              },
              {
                  id: 'brands',
                  name: 'Thương hiệu',
                  items: [
                      { name: 'Puma', id: 'puma' },
                      { name: 'UNIQLO', id: 'uniqlo' },
                      { name: 'Adidas', id: 'adidas' },
                      { name: 'Nike', id: 'nike' },
                      { name: 'kkkk', id: 'kkkk' },
                  ],
              },
          ],
      },
      {
          id: 'men',
          name: 'Nam',
          featured: [{
                  name: 'Sản phẩm mới',
                  id: '#',
                  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                  imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
              },
              {
                  name: 'Artwork Tees',
                  id: '#',
                  imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                  imageAlt: 'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
              },
          ],
          sections: [{
                  id: 'clothing',
                  name: 'Quần áo',
                  items: [
                      { name: 'Áo thun', id: 'aothun', href: `{men/clothing/men_aothun}` },
                      { name: 'Áo sơ mi', id: 'aosomi', href: `{men/clothing/men_aosomi}` },
                      { name: 'Áo Polo', id: 'aopolo', href: `{men/clothing/men_aopolo}` },
                      { name: 'Quần Jeans', id: 'quanjeans', href: `{men/clothing/men_quanjeans}` },
                      { name: 'Quần Kaki', id: 'quankaki', href: `{men/clothing/men_quankaki}` },
                      { name: 'Quần Short', id: 'quanshort', href: `{men/clothing/men_quanshort}` },
                  ],
              },
              {
                  id: 'accessories',
                  name: 'Phụ kiện',
                  items: [
                      { name: 'Đồng hồ', id: 'dongho', href: `{men/accessories/men_dongho}` },
                      { name: 'Ví/Túi xách', id: 'vi_tuixach', href: `{men/accessories/men_vituixach}` },
                      { name: 'Mũ', id: 'mu', href: `{men/accessories/men_mu}` },
                      { name: 'Kính râm', id: 'kinhram', href: `{men/accessories/men_kinhram}` },
                      { name: 'Thắt lưng', id: 'thatlung', href: `{men/accessories/men_thatlung}` },
                  ],
              },
              {
                  id: 'brands',
                  name: 'Brands',
                  items: [
                      { name: 'Re-Arranged', id: '#' },
                      { name: 'Counterfeit', id: '#' },
                      { name: 'Full Nelson', id: '#' },
                      { name: 'My Way', id: '#' },
                  ],
              },
          ],
      },
  ],
  pages: [
      // { name: 'Company', id: '/' },
      // { name: 'Stores', id: '/' },
  ],
}