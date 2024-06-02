interface NavItem {
  name: string;
  path: string;
  icon: React.N<
    React.PropsWithoutRef<LucideProps> & React.RefAttributes<SVGSVGElement>
  >;
}
