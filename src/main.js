let bundle = global.__egg_born_mock;
if (!bundle) {
  global.__egg_born_mock = bundle = require("egg-mock/bootstrap");

  before(async () => {
    // session
    bundle.app.mockSession({});
    // wait app ready
    await bundle.app.meta.checkAppReady();
    // restore
    bundle.mock.restore();
  });

  after(async () => {
    await bundle.app.close();
  });
}

module.exports = function (dirname) {
  const { assert, app, mock, mm } = bundle;
  return {
    assert,
    app,
    mock,
    mm,
    mockUrl(url, apiPrefix = true) {
      return app.meta.mockUtil.mockUrl(dirname, url, apiPrefix);
    },
    mockInfo() {
      return app.meta.mockUtil.parseInfoFromPackage(dirname);
    },
  };
};
