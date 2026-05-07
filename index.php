<?php
// Detect language from URL
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = ltrim($uri, '/');

// If root, serve English version
if (empty($uri) || $uri === '/') {
    include __DIR__ . '/en.html';
    exit;
}

// If /en or /ar, serve the corresponding HTML
if (strpos($uri, 'en') === 0) {
    include __DIR__ . '/en.html';
    exit;
}

if (strpos($uri, 'ar') === 0) {
    include __DIR__ . '/ar.html';
    exit;
}

// For other routes, try to serve from en/ or ar/ folders
include __DIR__ . '/en.html';
?>