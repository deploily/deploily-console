import { CollapseProps } from "antd";

export const itemsHelp: CollapseProps['items'] = [
    {
        key: '1',
        label: 'How it work ?',
        children: 'Deploily establishes a contract with a cloud provider to obtain exclusive discounts.',
    },
    {
        key: '2',
        label: 'Comment avoir remise ?',
        children: 'Vous devez avoir un compte approuvé par l’équipe Deploily.',
    },
    {
        key: '3',
        label: 'Comment appliquer remise ?',
        children: 'La remise est automatiquement appliquée une fois connecté.',
    },
    {
        key: '4',
        label: 'Pourqui on peut pas commender sur deploily ?',
        children: 'Certains fournisseurs ne permettent pas encore la commande directe.',
    },
    {
        key: '5',
        label: 'Mission Deploily ?',
        children: 'Faciliter l’accès aux ressources cloud à prix réduit.',
    },
];