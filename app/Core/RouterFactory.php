<?php

declare(strict_types=1);

namespace App\Core;

use Nette;
use Nette\Application\Routers\RouteList;
use Nette\Application\Routers\Route;

final class RouterFactory
{
	use Nette\StaticClass;

	public static function createRouter(): RouteList
	{
		$router = new RouteList;

		$domains = ['hojsin.cz.local', 'hojsin.cz', 'www.hojsin.cz', 'hojsin.cz.public.altisima.cz'];

		foreach ($domains as $domain) {
			// Redirecty na .html verze
			$router
				->withModule('HojsinCz')
				->withDomain($domain)
				->addRoute('/rezervace', [
					'presenter' => 'Page',
					'action' => 'redirect',
					'url' => '/rezervace.html'
				], Route::ONE_WAY)
				->addRoute('/reservation', [
					'presenter' => 'Page',
					'action' => 'redirect',
					'url' => '/reservation.html'
				], Route::ONE_WAY)
				->addRoute('/en', [
					'presenter' => 'Page',
					'action' => 'redirect',
					'url' => '/en.html'
				], Route::ONE_WAY)
				->addRoute('/svatby', [
					'presenter' => 'Page',
					'action' => 'redirect',
					'url' => '/svatby.html'
				], Route::ONE_WAY)
				->addRoute('/weddings', [
					'presenter' => 'Page',
					'action' => 'redirect',
					'url' => '/weddings.html'
				], Route::ONE_WAY)
				->addRoute('/firmy', [
					'presenter' => 'Page',
					'action' => 'redirect',
					'url' => '/firmy.html'
				], Route::ONE_WAY)
				->addRoute('/companies', [
					'presenter' => 'Page',
					'action' => 'redirect',
					'url' => '/companies.html'
				], Route::ONE_WAY)
				->addRoute('/rezervace.html', [
					'presenter' => 'Page',
					'action' => 'default',
					'page' => 'rezervace',
					'lang' => 'cs'
				])
				->addRoute('/reservation.html', [
					'presenter' => 'Page',
					'action' => 'default',
					'page' => 'reservation',
					'lang' => 'en'
				])
				->addRoute('/en.html', [
					'presenter' => 'Page',
					'action' => 'default',
					'page' => 'home.en',
					'lang' => 'en'
				])
				->addRoute('/svatby.html', [
					'presenter' => 'Page',
					'action' => 'default',
					'page' => 'svatby',
					'lang' => 'cs'
				])
				->addRoute('/weddings.html', [
					'presenter' => 'Page',
					'action' => 'default',
					'page' => 'weddings',
					'lang' => 'en'
				])
				->addRoute('/firmy.html', [
					'presenter' => 'Page',
					'action' => 'default',
					'page' => 'firmy',
					'lang' => 'cs'
				])
				->addRoute('/companies.html', [
					'presenter' => 'Page',
					'action' => 'default',
					'page' => 'firmy.en',
					'lang' => 'en'
				])
				->addRoute('/', [
					'presenter' => 'Page',
					'action' => 'default',
					'page' => 'home',
					'lang' => 'cs'
				]);
		}

		// PenzionsBorovna.cz routes
		$domains = ['penzionsborovna.cz.local', 'penzionsborovna.cz', 'www.penzionsborovna.cz', 'penzionsborovna.cz.public.altisima.cz'];

		foreach ($domains as $domain) {
			// Redirecty na .html verze
			$router
				->withModule('PenzionsBorovna')
				->withDomain($domain)
				->addRoute('/rezervace', [
					'presenter' => 'Page',
					'action' => 'redirect',
					'url' => '/rezervace.html'
				], Route::ONE_WAY)
				->addRoute('/reservation', [
					'presenter' => 'Page',
					'action' => 'redirect',
					'url' => '/reservation.html'
				], Route::ONE_WAY)
				->addRoute('/en', [
					'presenter' => 'Page',
					'action' => 'redirect',
					'url' => '/en.html'
				], Route::ONE_WAY)
				->addRoute('/rezervace.html', [
					'presenter' => 'Page',
					'action' => 'rezervace'
				])
				->addRoute('/reservation.html', [
					'presenter' => 'Page',
					'action' => 'reservation'
				])
				->addRoute('/en.html', [
					'presenter' => 'Page',
					'action' => 'en',
					'page' => 'home'
				])
				->addRoute('<page=default>', 'Page:default');
		}

		return $router;
	}
}
