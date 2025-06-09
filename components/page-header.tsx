interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-50">{title}</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  )
}
