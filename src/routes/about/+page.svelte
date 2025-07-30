<script lang="ts">
	import { blogConfig } from '$lib/config.js';
	import Icon from '$lib/components/Icon.svelte';
	import { t } from '$lib/stores/locale';
</script>

<svelte:head>
	<title>{$t('nav.about')} - {$t('site.title')}</title>
	<meta name="description" content={$t('about.description')} />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="text-center mb-12">
		<h1 class="text-4xl font-bold mb-4">{$t('nav.about')}</h1>
		<p class="text-lg text-muted">
			{$t('about.subtitle')}
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
		<!-- Profile Section -->
		<div class="lg:col-span-1">
			<div class="rounded-lg border p-6 text-center">
				<!-- Avatar Placeholder -->
				<div class="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center border">
					<Icon name="user" size={48} class="text-muted" />
				</div>
				
				<h2 class="text-2xl font-bold mb-2">
					{blogConfig.author.name}
				</h2>
				
				<p class="text-muted mb-2">
					{$t('about.title')}
				</p>
				<p class="text-sm text-muted mb-6">
					{$t('about.location')} 🇰🇷
				</p>
				
				<!-- Social Links -->
				<div class="flex justify-center space-x-4">
					{#if blogConfig.author.social.github}
						<a
							href={blogConfig.author.social.github}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
						>
							<Icon name="github" size={24} />
						</a>
					{/if}
				</div>
			</div>
		</div>

		<!-- Content Section -->
		<div class="lg:col-span-2">
			<div class="prose prose-lg max-w-none">
				<h2>{$t('about.hello')} 👋</h2>
				
				<p>
					{blogConfig.author.bio}
				</p>
				
				<h3>🛠️ {$t('about.technicalStack')}</h3>
				
				<h4>{$t('about.languagesCore')}</h4>
				<p>
					<strong>{$t('about.primary')}:</strong> Java • Python • Lua • Ruby • Bash<br>
					<strong>{$t('about.frontend')}:</strong> JavaScript • TypeScript • HTML5 • CSS3
				</p>
				
				<h4>{$t('about.backendFrameworks')}</h4>
				<p>
					Spring Framework • Ruby on Rails • MyBatis • JWT • Gradle • Maven • Hibernate • Swagger
				</p>
				
				<h4>{$t('about.databases')}</h4>
				<p>
					PostgreSQL • MySQL • MariaDB • Redis • Milvus • Oracle • SQLite • H2
				</p>
				
				<h4>{$t('about.devopsInfra')}</h4>
				<p>
					Docker • Nginx • Jenkins • Apache Tomcat • AWS • Proxmox • Cloudflare<br>
					WireGuard • UFW • DDNS • TrueNAS • Portainer • Let's Encrypt • Vaultwarden
				</p>
				
				<h4>{$t('about.devEnvironment')}</h4>
				<p>
					<strong>{$t('about.development')}:</strong> Arch Linux 🐧<br>
					<strong>{$t('about.server')}:</strong> Proxmox + Ubuntu<br>
					<strong>{$t('about.tools')}:</strong> Vim • Zed • VS Code • IntelliJ IDEA
				</p>
				
				<h3>📚 {$t('about.whatYoullFind')}</h3>
				
				<p>
					{$t('about.blogDescription')}
				</p>
				
				<ul>
					<li><strong>{$t('categories.backend.name')}:</strong> {$t('about.backendDesc')}</li>
					<li><strong>{$t('categories.infrastructure.name')}:</strong> {$t('about.infrastructureDesc')}</li>
					<li><strong>{$t('categories.linux.name')}:</strong> {$t('about.linuxDesc')}</li>
					<li><strong>{$t('categories.learning.name')}:</strong> {$t('about.learningDesc')}</li>
					<li><strong>{$t('categories.daily.name')}:</strong> {$t('about.dailyDesc')}</li>
				</ul>
				
				<h3>🚀 {$t('about.currentlyWorking')}</h3>
				<ul>
					<li>Dart for Flutter development</li>
					<li>Kotlin programming</li>
					<li>Infrastructure optimization projects</li>
				</ul>
				
				<h3>🎯 {$t('about.futureLearning')}</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
					<div>
						<h4 class="font-semibold mb-2">{$t('about.infraDevops')}</h4>
						<ul class="text-sm space-y-1">
							<li>• Kubernetes</li>
							<li>• NixOS & Nix</li>
							<li>• Apache Kafka</li>
							<li>• Rocky Linux</li>
						</ul>
					</div>
					<div>
						<h4 class="font-semibold mb-2">{$t('about.langFrameworks')}</h4>
						<ul class="text-sm space-y-1">
							<li>• Rust</li>
							<li>• Haskell</li>
							<li>• Laravel (PHP)</li>
							<li>• FastAPI</li>
						</ul>
					</div>
				</div>
				
				<h3>{$t('about.letsConnect')}</h3>
				
				<p>
					{$t('about.connectDescription')}
				</p>
				
				<ul>
					<li>{$t('about.connectQuestions')}</li>
					<li>{$t('about.connectDiscuss')}</li>
					<li>{$t('about.connectSuggestions')}</li>
					<li>{$t('about.connectHello')}</li>
				</ul>
				
				<div class="border rounded-lg p-6 mt-8">
					<h4 class="font-semibold mb-2">🏆 {$t('about.githubAchievements')}</h4>
					<div class="flex flex-wrap gap-2 text-sm">
						<span class="px-2 py-1 rounded border">YOLO</span>
						<span class="px-2 py-1 rounded border">Pull Shark x2</span>
						<span class="px-2 py-1 rounded border">Quickdraw</span>
					</div>
					<p class="text-sm mt-3">
						{$t('about.memberKernel')}
					</p>
				</div>
			</div>
		</div>
	</div>
</div>