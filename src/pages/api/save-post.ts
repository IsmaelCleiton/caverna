import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {

    if (!import.meta.env.DEV) {
        return new Response(JSON.stringify({ message: 'Salvar arquivos só é permitido em modo de desenvolvimento.' }), {
            status: 403,
        });
    }

    try {
        const data = await request.json();
        const { title, description, author, slug, content, pubDate, tags } = data;

        if (!title || !slug || !content) {
            return new Response(JSON.stringify({ message: 'Campos obrigatórios faltando.' }), { status: 400 });
        }

        const fileContent = `---
title: '${title.replace(/'/g, "''")}'
description: '${description.replace(/'/g, "''")}'
pubDate: '${pubDate}'
author: '${author || 'Ismael Cleiton'}'
slug: '${slug}'
tags: ${JSON.stringify(tags || [])}
---

${content}
`;

        const targetDir = path.join(process.cwd(), 'src', 'content', 'blog');
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        const safeSlug = slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
        const filePath = path.join(targetDir, `${safeSlug}.md`);


        fs.writeFileSync(filePath, fileContent, 'utf-8');

        return new Response(JSON.stringify({ message: 'Post salvo com sucesso!', path: filePath }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: 'Erro ao salvar arquivo', error: error.message }), { status: 500 });
    }
};