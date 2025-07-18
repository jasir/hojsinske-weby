<?php

declare(strict_types=1);

namespace App\Presentation\PenzionsBorovna\Page;

use Nette;
use App\Presentation\Components\PageMenuControl;

final class PagePresenter extends Nette\Application\UI\Presenter
{

    public function renderDefault(string $page = 'default', string $lang = 'cs'): void
    {
        $this->template->lang = $lang;
        $this->template->page = $page;

        $templateFile = __DIR__ . "/templates/$page.latte";
        if (file_exists($templateFile)) {
            $this->setLayout(__DIR__ . '/../@layout.latte');
            $this->template->setFile($templateFile);
        } else {
            $this->error('Stránka nebyla nalezena');
        }
    }

    public function renderEn(string $page = 'home'): void
    {
        $this->template->lang = 'en';
        $this->template->page = $page;

        $templateFile = __DIR__ . "/templates/$page.en.latte";
        if (file_exists($templateFile)) {
            $this->setLayout(__DIR__ . '/../@layout.latte');
            $this->template->setFile($templateFile);
        } else {
            $this->error('English page not found');
        }
    }

    public function renderRezervace(): void
    {
        $this->template->lang = 'cs';
        $this->setLayout(__DIR__ . '/../@reservationLayout.latte');
        $this->template->setFile(__DIR__ . '/templates/rezervace.latte');
    }

    public function renderReservation(): void
    {
        $this->template->lang = 'en';
        $this->setLayout(__DIR__ . '/../@reservationLayout.latte');
        $this->template->setFile(__DIR__ . '/templates/reservation.latte');
    }

    public function renderRedirect(string $url = '/'): void
    {
        $this->redirectUrl($url);
    }
}
