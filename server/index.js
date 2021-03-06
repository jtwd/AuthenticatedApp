import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';
import bodyParser from 'body-parser';

import users from './routes/users';
import auth from './routes/auth';
import events from './routes/events';

const PORT = 8115;
const app = express();
const compiler = webpack(webpackConfig);


app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/events', events);

app.use(webpackMiddleware(compiler,  {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));