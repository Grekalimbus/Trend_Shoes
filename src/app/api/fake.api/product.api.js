// const brendObject = {
//   adidas: 'Adidas',
//   lakai: 'Lakai',
//   reebok: 'Reebok',
//   NB: 'NEW BALANCE XC-72',
//   nike: 'Nike',
// };
import brend from './brend.api';
const api = [
  {
    name: 'ADIDAS NITEBALL',
    id: 'dsf3fsgf43tgdgf5gdsfg4',
    price: 4799,
    imgProcut: [
      'https://i.postimg.cc/KY3DK7Jd/1.png',
      'https://i.postimg.cc/k5Z9sCN2/2-h-GCJu7-Ii-E-transformed.png',
    ],
    firm: brend.adidas,
    quantity: [
      { value: 2, sizes: 39 },
      { value: 1, sizes: 40 },
      { value: 4, sizes: 41 },
      { value: 3, sizes: 42 },
    ],
  },
  {
    name: 'ADIDAS ZX 5K BOOST',
    id: '47gdfgdh9gdf94r875g84',
    price: 4599,
    imgProcut: [
      'https://i.postimg.cc/9QcJ8NcV/1-s1g-Dwpmd9-transformed.png',
      'https://i.postimg.cc/020CwdD4/2-2c-Ag-Ypzd-transformed.png',
      'https://i.postimg.cc/25Zb4rg5/3-p-Kn-Xh4-Uu-E-transformed.png',
    ],
    firm: brend.adidas,
    quantity: [
      { value: 4, sizes: 38 },
      { value: 4, sizes: 39 },
      { value: 3, sizes: 40 },
      { value: 2, sizes: 41 },
    ],
  },
  {
    name: 'ADIDAS NMD S1',
    id: 'fgn56t795g9844598733ddf',
    price: 4170,
    imgProcut: [
      'https://i.postimg.cc/c12JBVMg/1-gu-RFa4-L27-transformed.png',
      'https://i.postimg.cc/mrLZrRRq/2-B9n6w-mqq-transformed.png',
      'https://i.postimg.cc/FHmk0MNb/3-Sq-gb-ET8z-transformed.png',
    ],
    firm: brend.adidas,
    quantity: [
      { value: 1, sizes: 40 },
      { value: 2, sizes: 41 },
      { value: 2, sizes: 42 },
      { value: 1, sizes: 43 },
    ],
  },
  {
    name: 'LAKAI Cambridge Red/Gum Suede',
    id: 'fng8365838gm475t93f',
    price: 7600,
    imgProcut: [
      'https://i.postimg.cc/4y2sL203/1-Photo-Room.png',
      'https://i.postimg.cc/QtWzG4Vt/2-Cmbnzn1w-H-transformed.png',
      'https://i.postimg.cc/MKhvzXsp/3-El25-Fz-Ctb-transformed.png',
    ],
    firm: brend.lakai,
    quantity: [
      { value: 1, sizes: 39 },
      { value: 3, sizes: 41 },
      { value: 4, sizes: 42 },
      { value: 2, sizes: 43 },
    ],
  },
  {
    name: 'LAKAI Cambridge Slate Leather',
    id: '73583nf8sd9rfn74r43t',
    price: 10600,
    imgProcut: [
      'https://i.postimg.cc/fbgxjMzt/1-Photo-Room-1.png',
      'https://i.postimg.cc/GpNyTzKv/2-Photo-Room.png',
      'https://i.postimg.cc/9Qg4s1vs/3-Photo-Room.png',
    ],
    firm: brend.lakai,
    quantity: [
      { value: 2, sizes: 40 },
      { value: 3, sizes: 41 },
      { value: 5, sizes: 42 },
      { value: 3, sizes: 43 },
    ],
  },
  {
    name: 'LAKAI Lakai x Black Sabbath Riley 3 Smu Black Suede',
    id: '3g58gj5939v94ff23ghe5gg453',
    price: 4600,
    imgProcut: [
      'https://i.postimg.cc/9M0zb98C/1-Photo-Room.png',
      'https://i.postimg.cc/brQGShVt/2-Photo-Room.png',
      'https://i.postimg.cc/L8qpxTRy/3-Photo-Room.png',
    ],
    firm: brend.lakai,
    quantity: [
      { value: 1, sizes: 39 },
      { value: 2, sizes: 40 },
      { value: 3, sizes: 41 },
      { value: 1, sizes: 42 },
    ],
  },
  {
    name: 'Reebok Zig Kinetica II Edge',
    id: 'sdfng879fn95rg9gf293904g',
    price: 8999,
    imgProcut: [
      'https://i.postimg.cc/rmTfyVpw/Photo-Room.png',
      'https://i.postimg.cc/xTF4sN0g/2-Photo-Room-1.png',
      'https://i.postimg.cc/KzFqKnNc/3-Photo-Room-2.png',
    ],
    firm: brend.reebok,
    quantity: [
      { value: 4, sizes: 40 },
      { value: 3, sizes: 42 },
      { value: 1, sizes: 43 },
      { value: 1, sizes: 44 },
    ],
  },
  {
    name: 'NIKE AIR ZOOM G.T. CUT',
    id: 'dsgfnrfg78erg9043gb7t98',
    price: 5399,
    imgProcut: [
      'https://i.postimg.cc/L6NnGR7x/1-Photo-Room-2.png',
      'https://i.postimg.cc/9QDFS9yf/2-Photo-Room-2.png',
      'https://i.postimg.cc/wMx9kR6g/3-Photo-Room-3.png',
    ],
    firm: brend.nike,
    quantity: [
      { value: 3, sizes: 40 },
      { value: 4, sizes: 41 },
      { value: 3, sizes: 42 },
      { value: 1, sizes: 43 },
      { value: 1, sizes: 44 },
    ],
  },
  {
    name: 'NIKE AIR MAX PLUS',
    id: 'ds9f875g9n567450f97nfgdsx',
    price: 4199,
    imgProcut: [
      'https://i.postimg.cc/HLHWLhfr/1-Photo-Room-4.png',
      'https://i.postimg.cc/wvqhDFsv/2-Photo-Room-3.png',
      'https://i.postimg.cc/fWgx0cWz/3-Photo-Room-4.png',
    ],
    firm: brend.nike,
    quantity: [
      { value: 3, sizes: 40 },
      { value: 1, sizes: 41 },
      { value: 1, sizes: 44 },
    ],
  },
  {
    name: 'NIKE SB DUNK LOW',
    id: 'zvflbn9g908xv5yu5f48998',
    price: 4400,
    imgProcut: [
      'https://i.postimg.cc/XYghW13N/1-Photo-Room-5.png',
      'https://i.postimg.cc/L5zDTh84/2-Photo-Room-4.png',
      'https://i.postimg.cc/Z5YH8btZ/3-Photo-Room-5.png',
    ],
    firm: brend.nike,
    quantity: [
      { value: 3, sizes: 38 },
      { value: 1, sizes: 39 },
      { value: 3, sizes: 40 },
      { value: 2, sizes: 41 },
      { value: 4, sizes: 42 },
      { value: 3, sizes: 43 },
      { value: 2, sizes: 44 },
    ],
  },
  {
    name: 'NEW BALANCE XC-72',
    id: '435g9h9ve08vxgb',
    price: 4450,
    imgProcut: [
      'https://i.postimg.cc/mgGfBFHj/1-Photo-Room-6.png',
      'https://i.postimg.cc/mDkK8YvL/2-Photo-Room-5.png',
      'https://i.postimg.cc/vDFjYpcT/3-Photo-Room-6.png',
    ],
    firm: brend.NB,
    quantity: [
      { value: 1, sizes: 38 },
      { value: 2, sizes: 39 },
      { value: 6, sizes: 40 },
      { value: 2, sizes: 44 },
    ],
  },
  {
    name: 'NEW BALANCE 550',
    id: 'dsfj576hgn490fx0vmxlf4',
    price: 4450,
    imgProcut: [
      'https://i.postimg.cc/g07rMDx4/1-Photo-Room-7.png',
      'https://i.postimg.cc/pdmLnFsj/2-Photo-Room-6.png',
      'https://i.postimg.cc/kXM9bS45/3-Photo-Room-7.png',
    ],
    firm: brend.NB,
    quantity: [
      { value: 2, sizes: 38 },
      { value: 2, sizes: 39 },
      { value: 2, sizes: 40 },
      { value: 3, sizes: 41 },
      { value: 3, sizes: 42 },
    ],
  },
  {
    name: 'NEW BALANCE ALL COASTS 232',
    id: 'zdmn8r7g5283925tndfg8v',
    price: 4170,
    imgProcut: [
      'https://i.postimg.cc/nrGVkqjh/1-Photo-Room-8.png',
      'https://i.postimg.cc/wTFTRcYW/2-Photo-Room-7.png',
      'https://i.postimg.cc/VN0YhxrT/3-Photo-Room-8.png',
    ],
    firm: brend.NB,
    quantity: [
      { value: 3, sizes: 41 },
      { value: 3, sizes: 42 },
    ],
  },
];

function fetchAll() {
  return api;
}
export default fetchAll;
