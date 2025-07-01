<?php

declare(strict_types=1);

namespace App\Presentation\HojsinCz\Page;

use Nette;
use App\Presentation\Components\PageMenuControl;

final class PagePresenter extends Nette\Application\UI\Presenter
{
    private string $currentPage = 'default';
    private string $currentLang = 'cs';

    public function renderDefault(string $page = 'default'): void
    {
        $this->currentPage = $page;

        // Set language based on page
        if ($page === 'reservation') {
            $this->currentLang = 'en';
        } else {
            $this->currentLang = 'cs';
        }

        // Pass language to template
        $this->template->lang = $this->currentLang;

        $templateFile = __DIR__ . "/templates/$page.latte";
        if (file_exists($templateFile)) {
            $this->setLayout(__DIR__ . '/../@layout.latte');
            $this->template->setFile($templateFile);
        } else {
            $this->error('Stránka nebyla nalezena');
        }
    }

    public function renderEn(): void
    {
        $this->currentPage = 'en';
        $this->currentLang = 'en';

        // Pass language to template
        $this->template->lang = $this->currentLang;

        $this->setLayout(__DIR__ . '/../@layout.latte');
        $this->template->setFile(__DIR__ . '/templates/en.latte');
    }

    public function createComponentPageMenu(): PageMenuControl
    {
        return new PageMenuControl($this->currentPage, 'hojsin.cz');
    }
}
