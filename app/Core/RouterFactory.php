<?php

declare(strict_types=1);

namespace App\Core;

use Nette;
use Nette\Application\Routers\RouteList;


final class RouterFactory
{
	use Nette\StaticClass;

	public static function createRouter(): RouteList
	{
		$router = new RouteList;

		// Hojsin.cz routes
		$router->withModule('HojsinCz')
			->withDomain('hojsin.cz.local')
			->addRoute('en.html', 'Page:en');

		$router->withModule('HojsinCz')
			->withDomain('hojsin.cz.local')
			->addRoute('<page=default>', 'Page:default');

		$router->withModule('HojsinCz')
			->withDomain('hojsin.cz')
			->addRoute('en.html', 'Page:en');

		$router->withModule('HojsinCz')
			->withDomain('hojsin.cz')
			->addRoute('<page=default>', 'Page:default');

		// PenzionsBorovna.cz routes
		$router->withModule('PenzionsBorovna')
			->withDomain('penzionsborovna.cz.local')
			->addRoute('<page=default>', 'Page:default');

		$router->withModule('PenzionsBorovna')
			->withDomain('penzionsborovna.cz')
			->addRoute('<page=default>', 'Page:default');

		return $router;
	}
}
