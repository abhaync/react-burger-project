import axios from 'axios';

const myInst = axios.create({
  baseURL: 'https://my-react-burger-project.firebaseio.com/'
});

export default myInst;
