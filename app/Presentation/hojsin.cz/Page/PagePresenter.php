<?php

declare(strict_types=1);

namespace App\Presentation\HojsinCz\Page;

use Nette;

final class PagePresenter extends Nette\Application\UI\Presenter
{
    public function renderDefault(string $page = 'default'): void
    {
        $templateFile = __DIR__ . "/templates/$page.latte";
        if (file_exists($templateFile)) {
            $this->setLayout(__DIR__ . '/../@layout.latte');
            $this->template->setFile($templateFile);
        } else {
            $this->error('Stránka nebyla nalezena');
        }
    }
}
