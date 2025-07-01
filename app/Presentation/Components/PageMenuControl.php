<?php

declare(strict_types=1);

namespace App\Presentation\Components;

use Nette;
use Nette\Application\UI\Control;

final class PageMenuControl extends Control
{
    private string $currentPage;
    private string $domain;

    // Menu items pro každou doménu
    private array $menuItems = [
        'hojsin.cz' => [
            'default' => ['title' => 'Úvod', 'url' => '/'],
            'informace' => ['title' => 'Informace', 'url' => '/informace'],
            'kontakt' => ['title' => 'Kontakt', 'url' => '/kontakt']
        ],
        'penzionsborovna.cz' => [
            'default' => ['title' => 'Penzíon', 'url' => '/'],
            'pokoje' => ['title' => 'Pokoje', 'url' => '/pokoje'],
            'kontakt' => ['title' => 'Kontakt', 'url' => '/kontakt']
        ]
    ];

    public function __construct(string $currentPage, string $domain)
    {
        $this->currentPage = $currentPage;
        $this->domain = $domain;
    }

    public function render(): void
    {
        $this->template->menuItems = $this->menuItems[$this->domain] ?? [];
        $this->template->currentPage = $this->currentPage;
        $this->template->setFile(__DIR__ . '/templates/pageMenu.latte');
        $this->template->render();
    }
}