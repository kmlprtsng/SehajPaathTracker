App.info({
  name: 'sehajPaathTracker',
  description: 'An iOS app built with Meteor',
  version: '0.0.1'
});

App.icons({
  'iphone': 'resources/icons/icon-72.png',
  'iphone_2x': 'resources/icons/icon-72@2x.png',
  'iphone_3x': 'resources/icons/icon-72@2x.png',
  'android_ldpi': 'resources/icons/36.png',
  'android_mdpi': 'resources/icons/48.png',
  'android_hdpi': 'resources/icons/72.png',
  'android_xhdpi': 'resources/icons/96.png'
});

App.launchScreens({
  'android_mdpi_portrait': 'resources/splash/splash_screen_mdpi.png',
  'android_hdpi_portrait': 'resources/splash/splash_screen_hdpi.png',
  'android_xhdpi_portrait': 'resources/splash/splash_screen_xhdpi.png'
});

App.setPreference('Orientation', 'portrait');

App.accessRule('http://*');
App.accessRule('https://*');