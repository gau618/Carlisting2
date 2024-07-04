import imgAudi from "../assets/a.jpg";
import imgLamborghini from "../assets/b.jpg";
import imgFerrari from "../assets/c.jpg";
import imgG1 from "../assets/imggallery1.jpg";
import imgG2 from "../assets/imggallery2.jpg";

export const cars = [
  {
    carId: 1,
    name: 'Audi Q8',
    imagegallery: [imgG1, imgG2],
    image: imgAudi,
    carType: 'SUV',
    engine: '3.0L V6',
    color: 'Black',
    VIN: 'ABC123456789DEF',
    mileage: '10,000 miles',
    interiorColor: 'Black Leather',
    price: '$65000',
    transmission: 'Automatic', // Added transmission type
    fuel: 'Gasoline', // Added fuel type
  },
  {
    carId: 2,
    imagegallery: [imgG1, imgG2],
    name: 'Lamborghini Urus',
    image: imgLamborghini,
    carType: 'Sports',
    engine: '4.0L V8',
    color: 'Yellow',
    VIN: 'XYZ987654321LMN',
    mileage: '5,000 miles',
    interiorColor: 'Black Alcantara',
    price: '$75000',
    transmission: 'Automatic', // Added transmission type
    fuel: 'Gasoline', // Added fuel type
  },
  {
    carId: 3,
    name: 'Ferrari SF90',
    imagegallery: [imgG1, imgG2],
    image: imgFerrari,
    carType: 'Sports',
    engine: '3.9L V8',
    color: 'Red',
    VIN: 'PQR456789123STU',
    mileage: '2,000 miles',
    interiorColor: 'Red Leather',
    price: '$90000',
    transmission: 'Automatic', // Added transmission type
    fuel: 'Gasoline', // Added fuel type
  },
];

export default cars;
