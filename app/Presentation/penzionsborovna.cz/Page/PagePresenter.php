<?php

declare(strict_types=1);

namespace App\Presentation\PenzionsBorovna\Page;

use Nette;
use App\Presentation\Components\PageMenuControl;

final class PagePresenter extends Nette\Application\UI\Presenter
{
    private string $currentPage = 'default';

    public function renderDefault(string $page = 'default'): void
    {
        $this->currentPage = $page;

        $templateFile = __DIR__ . "/templates/$page.latte";
        if (file_exists($templateFile)) {
            // Explicitně nastavíme layout PŘED setFile()
            $this->setLayout(__DIR__ . '/../@layout.latte');
            $this->template->setFile($templateFile);
        } else {
            $this->error('Stránka nebyla nalezena');
        }
    }

    public function createComponentPageMenu(): PageMenuControl
    {
        return new PageMenuControl($this->currentPage, 'penzionsborovna.cz');
    }
}
