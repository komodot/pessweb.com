<?php
require_once __DIR__.'/../vendor/autoload.php';

$app = new Silex\Application();
$app['debug'] = true;

$app->register(new Silex\Provider\TwigServiceProvider(), array(
  'twig.path' => __DIR__.'/../views',
));

$app->get('/hello/{name}', function ($name) use ($app) {
    return $app['twig']->render('hello.twig', array(
      'name' => $name,
    ));
});

$main = array('test');

$app->get('/news', function () use ($app) {
  return $app['twig']->render('news.twig');
});

$app->get('/navmenu/{section}', function ($section = 'home') use ($app) {
  return $app['twig']->render('navmenu.twig', array('section' => $section));
});

$app->get('/', function () use ($app, $main) {
  return $app['twig']->render('main.twig', array(
    'content' => $main,
  ));
});

$app->run();