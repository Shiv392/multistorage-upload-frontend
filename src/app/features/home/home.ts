import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type Id = 'disk' | 'db' | 's3';
type Level = 'good' | 'ok' | 'bad';

interface Store {
  id: Id;
  name: string;
  icon: string;
  tagline: string;
  endpoint: string;
  where: string;
  best: string;
  pros: string[];
  cons: string[];
  row: { k: string; v: string; hot?: boolean }[];
}

const COMMON = [
  { k: 'file_name', v: 'photo.png' },
  { k: 'file_type', v: 'image/png' },
  { k: 'size', v: '204800' },
];

const STORES: Store[] = [
  {
    id: 'disk',
    name: 'Disk',
    icon: 'pi-folder',
    tagline: 'Save the file in a folder on the server.',
    endpoint: 'disk',
    where: '/var/app/uploads/',
    best: 'Local development and quick prototypes.',
    pros: ['Simplest to build', 'No extra service or cost', 'Fast to read back'],
    cons: ['Lost if the server is rebuilt', 'Breaks with more than one server', 'You handle backups yourself'],
    row: [
      ...COMMON,
      { k: 'storage_type', v: 'DISK' },
      { k: 'file_path', v: '/var/app/uploads/a1b2.png', hot: true },
      { k: 's3_key', v: 'NULL' },
      { k: 'data', v: 'NULL' },
    ],
  },
  {
    id: 'db',
    name: 'Database',
    icon: 'pi-database',
    tagline: 'Keep the bytes inside PostgreSQL itself.',
    endpoint: 'db',
    where: 'bytea column',
    best: 'Tiny files where one backup for everything matters.',
    pros: ['One place for data and files', 'Works with many servers', 'Files and rows stay in sync'],
    cons: ['Database grows with every upload', 'Backups get slow and heavy', 'Every read loads the database'],
    row: [
      ...COMMON,
      { k: 'storage_type', v: 'DB' },
      { k: 'file_path', v: 'NULL' },
      { k: 's3_key', v: 'NULL' },
      { k: 'data', v: '\\x89504e47...', hot: true },
    ],
  },
  {
    id: 's3',
    name: 'Bucket',
    icon: 'pi-cloud',
    tagline: 'Hand the file to S3-compatible object storage.',
    endpoint: 's3',
    where: 'Supabase bucket',
    best: 'Real apps that need to grow.',
    pros: ['Built to store files', 'Database stays small', 'Works with many servers'],
    cons: ['Needs a bucket, keys and an SDK', 'Secrets to keep safe', 'Small cost at scale'],
    row: [
      ...COMMON,
      { k: 'storage_type', v: 'S3' },
      { k: 'file_path', v: 'NULL' },
      { k: 's3_key', v: 'users/12/a1b2.png', hot: true },
      { k: 'data', v: 'NULL' },
    ],
  },
];

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class Home {
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private destroyRef = inject(DestroyRef);

  stores = STORES;
  selected = signal<Id>('disk');
  current = computed(() => STORES.find((s) => s.id === this.selected())!);
  auto = signal(true);
  run = signal(0);
  hot = signal<number | null>(null);

  compare: { q: string; v: [Level, string][] }[] = [
    { q: 'Survives a redeploy', v: [['bad', 'Only with a mounted volume'], ['good', 'Yes'], ['good', 'Yes']] },
    { q: 'Database size', v: [['good', 'Stays small'], ['bad', 'Grows with every file'], ['good', 'Stays small']] },
    { q: 'Works with many servers', v: [['bad', 'No'], ['good', 'Yes'], ['good', 'Yes']] },
    { q: 'Backups', v: [['ok', 'You manage them'], ['bad', 'Huge, slow dumps'], ['good', 'Handled by the provider']] },
    { q: 'Setup effort', v: [['good', 'Lowest'], ['good', 'Low'], ['ok', 'Bucket, keys and SDK']] },
  ];

  steps = [
    { t: 'Pick a file', d: 'Angular reads it from a file input and wraps it in FormData.' },
    { t: 'Send it', d: 'A multipart POST goes to the Spring Boot API.' },
    { t: 'Store the bytes', d: 'Disk, database or bucket, depending on the endpoint.' },
    { t: 'Save the details', d: 'PostgreSQL keeps the name, type, size and location.' },
    { t: 'Show it', d: 'The API replies with a Content-Type header and the browser draws it.' },
  ];

  stack = ['Angular', 'PrimeNG', 'Tailwind CSS', 'Spring Boot', 'PostgreSQL', 'Supabase Storage'];

  constructor() {
    afterNextRender(() => {
      const root = this.host.nativeElement;
      const items = root.querySelectorAll('.reveal');
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduce || !('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('in'));
      } else {
        const io = new IntersectionObserver(
          (entries) =>
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add('in');
                io.unobserve(e.target);
              }
            }),
          { threshold: 0.15 },
        );
        items.forEach((el) => io.observe(el));
        this.destroyRef.onDestroy(() => io.disconnect());
      }

      // Cycle through the three storage types until the visitor picks one.
      const timer = setInterval(() => {
        if (!this.auto() || reduce) return;
        const i = STORES.findIndex((s) => s.id === this.selected());
        this.setStore(STORES[(i + 1) % STORES.length].id);
      }, 6000);
      this.destroyRef.onDestroy(() => clearInterval(timer));
    });
  }

  private setStore(id: Id) {
    this.selected.set(id);
    this.run.update((n) => n + 1);
  }

  pick(id: Id) {
    this.auto.set(false);
    this.setStore(id);
  }

  replay() {
    this.run.update((n) => n + 1);
  }

  watch(id: Id) {
    this.pick(id);
    this.go('top');
  }

  go(id: string, ev?: Event) {
    ev?.preventDefault();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.host.nativeElement
      .querySelector('#' + id)
      ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }

  tilt(e: MouseEvent) {
    if (!matchMedia('(hover: hover)').matches) return;
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', `${(x - 0.5) * 8}deg`);
    el.style.setProperty('--rx', `${(0.5 - y) * 8}deg`);
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
  }

  untilt(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }
}