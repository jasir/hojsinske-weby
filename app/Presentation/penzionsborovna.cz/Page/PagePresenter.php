<?php

declare(strict_types=1);

namespace App\Presentation\HojsinCz\Page;

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

    public function renderRedirect(string $url = '/'): void
    {
        $this->redirectUrl($url);
    }
}
