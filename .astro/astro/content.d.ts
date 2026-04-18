declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"compare": {
"macbook-air-vs-dell-xps.md": {
	id: "macbook-air-vs-dell-xps.md";
  slug: "macbook-air-vs-dell-xps";
  body: string;
  collection: "compare";
  data: InferEntrySchema<"compare">
} & { render(): Render[".md"] };
"macbook-air-vs-macbook-pro-college.mdx": {
	id: "macbook-air-vs-macbook-pro-college.mdx";
  slug: "macbook-air-vs-macbook-pro-college";
  body: string;
  collection: "compare";
  data: InferEntrySchema<"compare">
} & { render(): Render[".mdx"] };
};
"guides": {
"best-desk-setup-college-students-budget.mdx": {
	id: "best-desk-setup-college-students-budget.mdx";
  slug: "best-desk-setup-college-students-budget";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".mdx"] };
"best-headphones-studying-college-students.mdx": {
	id: "best-headphones-studying-college-students.mdx";
  slug: "best-headphones-studying-college-students";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".mdx"] };
"best-ipad-college-students.mdx": {
	id: "best-ipad-college-students.mdx";
  slug: "best-ipad-college-students";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".mdx"] };
"best-laptop-college-students-under-1000.mdx": {
	id: "best-laptop-college-students-under-1000.mdx";
  slug: "best-laptop-college-students-under-1000";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".mdx"] };
"best-laptop-stand-college-students.mdx": {
	id: "best-laptop-stand-college-students.mdx";
  slug: "best-laptop-stand-college-students";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".mdx"] };
"best-laptops-for-college.md": {
	id: "best-laptops-for-college.md";
  slug: "best-laptops-for-college";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".md"] };
"best-mechanical-keyboard-college-students.mdx": {
	id: "best-mechanical-keyboard-college-students.mdx";
  slug: "best-mechanical-keyboard-college-students";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".mdx"] };
"best-monitor-college-students-under-300.mdx": {
	id: "best-monitor-college-students-under-300.mdx";
  slug: "best-monitor-college-students-under-300";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".mdx"] };
"best-wireless-mouse-college-students.mdx": {
	id: "best-wireless-mouse-college-students.mdx";
  slug: "best-wireless-mouse-college-students";
  body: string;
  collection: "guides";
  data: InferEntrySchema<"guides">
} & { render(): Render[".mdx"] };
};
"reviews": {
"anker-655-usb-c-hub.md": {
	id: "anker-655-usb-c-hub.md";
  slug: "anker-655-usb-c-hub";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"apple-airpods-pro-2.md": {
	id: "apple-airpods-pro-2.md";
  slug: "apple-airpods-pro-2";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"kindle-paperwhite.md": {
	id: "kindle-paperwhite.md";
  slug: "kindle-paperwhite";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"logitech-mx-keys-mini.md": {
	id: "logitech-mx-keys-mini.md";
  slug: "logitech-mx-keys-mini";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"logitech-mx-master-3s.md": {
	id: "logitech-mx-master-3s.md";
  slug: "logitech-mx-master-3s";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"samsung-t7-portable-ssd.md": {
	id: "samsung-t7-portable-ssd.md";
  slug: "samsung-t7-portable-ssd";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"sony-wh-1000xm5.md": {
	id: "sony-wh-1000xm5.md";
  slug: "sony-wh-1000xm5";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
