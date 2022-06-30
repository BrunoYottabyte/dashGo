const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://Bruno:xtharex1234@cluster0.gxrjn.mongodb.net/geogasServicos',
    { useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => console.log('DB is Up!!'))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

module.exports = mongoose;
