export interface FooterProps {
    name: string;
    description: string;
    extra?: string;
    contactTip: string;
}

const Footer = ({ name, description, extra, contactTip }: FooterProps) => {
    return (
        <footer className="border-t mt-16 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} {name}
              </p>
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
              <p className="text-sm text-muted-foreground">
                {extra}
              </p>
            </div>
            <div className="pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                {contactTip} <a href="mailto:wmh.wang@outlook.com" className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors underline decoration-2 underline-offset-2">wmh.wang@outlook.com</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer   
