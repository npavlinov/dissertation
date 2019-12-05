import config from '../config/config'
import server from '../index';

server.listen(config.port, config.host, () => {
  console.log('Server on:', config.serverUrl);
})